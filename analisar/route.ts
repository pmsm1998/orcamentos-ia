import { NextResponse } from "next/server";
import { analisarImagem } from "../../../../lib/ia";

export async function POST(req: Request) {
  const formData = await req.formData();

  const imagem = formData.get("imagem");
  const cliente = String(formData.get("cliente") || "");
  const referencia = String(formData.get("referencia") || "");
  const tipo_cliente = String(formData.get("tipo_cliente") || "Particular");
  const local_obra = String(formData.get("local_obra") || "");

  if (!imagem) {
    return NextResponse.json({ error: "Imagem em falta" }, { status: 400 });
  }

  const extraido = await analisarImagem(imagem as File);

  return NextResponse.json({
    cliente,
    referencia,
    tipo_cliente,
    local_obra,
    ...extraido,
  });
}