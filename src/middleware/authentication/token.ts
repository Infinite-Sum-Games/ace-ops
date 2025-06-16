import { V4 } from "paseto";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

// TODO: Change during deployment
const secretKey = "ASzgds9IWn6$wuKu#Nr0^Vvt9JqA4lqzNHu2F1mPPlJuhZivYXreNG@fPC6" +
  "sHEbDP$ufyugGq(gu%7UgZ!XJezqqQ84$5Zbo*QEndJ*S&Q4InJ*6&Dyn^y3uoOGe0@cx#Mgm" +
  "0%x$ZTU9r!HKRq0MScFA@aK$b9@Mv$qUCKCd9#8((Kz!!Zt5Qb(ZMp*s#c#mA%ufxhVCMo%6Z" +
  "&iOF4$SuQO^cuF#ol3GgBebmkIn3*y^iEQfQM9$Lsx&1s2WR5ZE57kqJW2UDVjl#IZQwEm3$#" +
  "sB#S8yd&Op%h$EZaAq2XEjuQ*0yK@H0SX&ry*P68P!n&dAXCtt1CgzrceVF4KOCs48u6KUvwz" +
  "UC9fGEOtqZJ(z)%tgx8hU^hD)Mv5j6M8sW32gdCb2Fpgv@1owE5IL$E9*w$6*LS*WQYgMc0zM" +
  "iDRh#9F9(9YW%W*M*Sn9KoV4yf5MVUrW462dUY(k%6#pjTIQsmW9LfOdrHBjtg0XQHL4wXP23" +
  "@LGuEdsV*S&uT)R3BJK65FB8%0jMg&juaw$EOz*PSiwFgZG%X)isCuqFdPegX!8sFHXY2UnWD" +
  "N@!8N$s^lFYi2ZMXo$%PgZKj8!A(%L&66hE#VreIG%uaf^5Qhmrg*Tqv)w3DEYvd#!pfnq7Yc" +
  "ecjxmcBRgs4vZHc)2w^Y@BC*!yk@d*9*4OMhfrLb0P@cO9N3chRkV7C!iWwuK7Cb5X#QSoZib" +
  "qporV695zWD^&VNC5y3e)6q8uJKMv41)L9YGCAxEPfeksRL8PqVVjAejy6q#egfuIwX$pcz#q" +
  "ZvvCnVP2k%!up9w%f(((bMGm8WHkS@kZAo2JOfB79*&qPySJapnqhQ8%hRGOhFUjbaVUjShp^" +
  "H5&NEyJUQvwT$qgrWp#Li%KeAeQypNX0@0LDlv(DuYfe6NRqIFW*lP^u!FiiUs$tY7z27W1d7" +
  "AK5#1khtx34KgoQeBkhGG!RX(5e)dNz(UI!39TrttTzmnWdyoy0o4fXIsGylbGN4O"
  ;

const createToken = async (email: string) => {
  const data = { email, secretKey };
  const privateKeyPath = path.resolve(__dirname, "../../encryption/private_key.pem");
  const privateKey = fs.readFileSync(privateKeyPath, "utf-8");
  const token = await V4.sign(data, privateKey, { expiresIn: '1440m' });

  return token;
}

const createTempToken = async (email: string) => {
  const data = { email, secretKey };
  const privateKey = fs.readFileSync("../../encryption/private_key.pem");
  const token = await V4.sign(data, privateKey, { expiresIn: '5m' });

  return token;
}

const validateToken = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const tokenHeader: string = req.headers.authorization as string;
    const token: string = tokenHeader.split(" ")[1];

    if (tokenHeader == null || token == null) {
      res.status(401).send({
        message: "UNAUTHORIZED REQUEST: Token Missing"
      });
      return;
    }

    const publicKeyPath = path.resolve(__dirname, "../../encryption/public_key.pem");
    const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

    const payLoad = await V4.verify(token, publicKey);
    if (payLoad["secretKey"] === secretKey) {
      req.body.email = payLoad["email"];
      next();
      return;
    } else {
      // Log the error
      res.status(401).send({
        message: "UNAUTHORIZED REQUEST: Warning"
      });
      return;
    }

  } catch (err) {
    res.status(401).send({
      "ERROR": "UNAUTHORIZED ACCESS: Warning"
    });
    return;
  }
}

export { createToken, validateToken, createTempToken };
