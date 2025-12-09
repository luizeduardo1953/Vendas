'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Pen, Plus, Search, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { Cliente } from "@/types/cliente";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Clientes() {

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false); // Controla o Dialog
    const [clientes, setCliente] = useState<Cliente[]>([]);

    async function criarCliente(novoCliente: Cliente) {
        const res = await fetch(`${API_BASE_URL}/clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoCliente),
        });

        if (!res.ok) {
            const erro = await res.json();
            throw new Error(erro.message || 'Erro ao criar cliente');
        }

        return await res.json();
    }

    async function deletarCliente(cliente: Cliente) {

        if (!cliente.id) {
            console.error("Tentativa de deletar cliente sem ID");
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/clientes/${cliente.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.message || 'Erro ao encontrar clientes');
            }
        } catch (error) {
            console.log(error);
            throw error; // Re-lança o erro para o Handle pegar
        }
    }

    const buscarClientes = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/clientes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!res.ok) {
                const erro = await res.json();
                throw new Error(erro.message || 'Erro ao encontrar clientes');
            }

            const data = await res.json();
            setCliente(data);
        } catch (error) {
            console.error(error);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        buscarClientes();
    }, [buscarClientes]);

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome.trim()) {
            setErro('O nome é obrigatório');
            return;
        }

        setLoading(true);
        setErro(null);

        try {
            await criarCliente({ nome: nome.trim() });
            setNome("");
            setDialogOpen(false); // Fecha o diálogo
            alert('Cliente criado com sucesso!');
        } catch (error) {
            const mensagem = error instanceof Error
                ? error.message
                : 'Erro desconhecido ao criar cliente';
            setErro(mensagem);
            console.error('Erro ao criar cliente:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletar = async (cliente: Cliente) => {
        if (!cliente.id) return; // Segurança extra

        const confirmacao = confirm(`Deseja realmente excluir ${cliente.nome}?`);
        
        if (confirmacao) {
            try {
                // Passa o objeto inteiro, conforme sua função pede
                await deletarCliente(cliente);

                // Atualiza a lista removendo o item pelo ID
                setCliente((prev) => prev.filter((item) => item.id !== cliente.id));
                
                alert("Cliente removido com sucesso!");
            } catch (error) {
                alert(`Erro ao tentar excluir o cliente, ${error}`);
            }
        }
    }

return (
    <>
        <div className="min-h-screen bg-gray-50/50 p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col">
                    <h1 className="text-3xl text-gray-900 font-bold">Clientes</h1>
                    <p className="text-gray mt-1 text-gray-500">Gerencia seus clientes</p>
                </div>
                <div className="flex flex-row justify-between items-end">

                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 hover:text-white"
                            >
                                <Plus size={18} /> Novo Cliente
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSalvar}>
                                <DialogHeader>
                                    <DialogTitle>Novo Cliente</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-3">
                                        <Input
                                            id="nome"
                                            name="nome"
                                            placeholder="Nome do cliente"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                        {erro && (
                                            <p className="text-sm text-red-500">{erro}</p>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={loading}
                                        >
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        className="bg-emerald-500 hover:bg-emerald-600"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Salvando...
                                            </>
                                        ) : (
                                            'Criar'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                    placeholder="Buscar clientes..."
                    className="pl-12 h-12 rounded-xl border-slate-200 bg-white"
                />
            </div>
            <div className="space-y-4">
                {clientes.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum cliente encontrado.</p>
                ) : (
                    clientes.map((cliente) => (
                        <Card key={cliente.id}
                            className="p-5 flex flex-row items-center justify-between hover:shadow-lg transition-shadow border-slate-100">
                            <div className="flex justify-center items-center gap-5">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500">
                                    <span className="text-bold text-2xl text-white">
                                        {cliente.nome.toUpperCase().charAt(0)}
                                    </span>
                                </div>
                                <div className="">
                                    <span className="text-bold text-gray-900">
                                        {cliente.nome}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-6">
                                <button type="button"
                                    className="cursor-pointer"
                                >
                                    <Pen
                                        color="gray"
                                        size={18}
                                    />
                                </button>
                                <button type="button"
                                    className="cursor-pointer"
                                >
                                    <Trash
                                        color="red"
                                        size={18}
                                        onClick={() => handleDeletar(cliente)}
                                    />
                                </button>
                            </div>
                        </Card>
                    ))
                )}

            </div>
        </div>

    </>
)
}