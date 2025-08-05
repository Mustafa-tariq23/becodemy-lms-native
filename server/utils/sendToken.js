import jwt from 'jsonwebtoken';

export const sendToken = async (user, res) => {
  const accessToken = jwt.sign(
    {id: user.id},
    process.env.JWT_SECRET,
  );
  res.status(200).json({
    success: true,
    accessToken
  });
}