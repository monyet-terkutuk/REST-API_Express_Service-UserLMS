const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: { type: "string", nullable: false },
    email: { type: "email", nullable: false },
    password: { type: "string", min: 6, nullable: false },
    profession: { type: "string", nullable: true },
  };

  const validate = v.validate(req.body, schema);
  //   error jika validasi gagal
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  // cek apakah ada email yg sama dari db
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  // error jika sudah ada email yg sama
  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUser = await User.create(data);

  return res.status(200).json({
    status: "success",
    data: {
      id: createUser.id,
    },
  });
};
