import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);

  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data, error } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  return <div>Ultima Atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data, error } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformation = "Carregando...";
  if (!isLoading && data) {
    databaseInformation = (
      <ul>
        <li>Versão: {data.dependencies.database.version}</li>
        <li>
          Máximo de conexões: {data.dependencies.database.max_connections}
        </li>
        <li>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </li>
      </ul>
    );
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  return (
    <div>
      <h2>Saúde do Banco de Dados</h2>
      <div>{databaseInformation}</div>
    </div>
  );
}
