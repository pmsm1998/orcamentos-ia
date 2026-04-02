"use client";

import { useState } from "react";

export default function Page() {
  const [cliente, setCliente] = useState("");
  const [referencia, setReferencia] = useState("");
  const [km, setKm] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function gerar() {
    if (!file) {
      alert("Carrega uma imagem");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("imagem", file);
    data.append("cliente", cliente);
    data.append("referencia", referencia);
    data.append("km_calculados", String(km));

    const res = await fetch("/api/orcamentos/analisar", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    setResultado(json);
    setLoading(false);
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Orçamentos IA</h1>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <br />

        <input
          placeholder="Referência"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
        />

        <br />

        <input
          type="number"
          placeholder="KM"
          onChange={(e) => setKm(Number(e.target.value))}
        />

        <br />

        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        <br /><br />

        <button onClick={gerar}>
          {loading ? "A gerar..." : "Gerar orçamento"}
        </button>
      </div>

      {resultado && (
        <div style={{ marginTop: 30 }}>
          <h2>Resultado</h2>

          <pre>{JSON.stringify(resultado, null, 2)}</pre>

          <button
            onClick={() =>
              alert("Guardar online será ativado no próximo passo")
            }
            style={{
              marginTop: 20,
              padding: 10,
              background: "green",
              color: "white",
            }}
          >
            Guardar orçamento
          </button>
        </div>
      )}
    </main>
  );
}