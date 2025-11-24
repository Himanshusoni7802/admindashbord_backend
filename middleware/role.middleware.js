

export function requireRole(role) {
  return function (req, res, next) {


      console.log("Hello from req role middleware ")

      //console.log("req",req);


    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ msg: "Insufficient role" });
    }

    next();
  };
}