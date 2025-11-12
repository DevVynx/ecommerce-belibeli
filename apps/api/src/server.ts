import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port} 🚀`);
});
