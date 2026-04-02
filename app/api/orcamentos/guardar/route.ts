import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "orcamentos.json");

export async function POST(req: Request) {
  try {
    const novo = await req.json();

    let dados = [];

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf-8");
      dados = JSON.parse(file);
    }

    dados.push({
      ...novo,
      id: Date.now(),
      data: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao guardar orçamento:", error);
    return NextResponse.json(
      { ok: false, error: "Erro ao guardar orçamento" },
      { status: 500 }
    );
  }
}