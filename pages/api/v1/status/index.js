function status(request, response) {
  response.status(200).json({ status: "São Acima da Média" });
}

export default status;
