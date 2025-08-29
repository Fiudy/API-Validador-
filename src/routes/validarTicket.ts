import { FastifyInstance } from "fastify";
import axios from "axios";
import { GLPI_API_URL, GLPI_USER_TOKEN, GLPI_APP_TOKEN } from "../utils/glpiConfig";
import { decode } from "html-entities";

export default async function validarTicket(app: FastifyInstance) {
    app.post("/validar-ticket", async (request, reply) => {
        const { ticket } = request.body as { ticket: number };
        try {
            // 1. Iniciar sessão
            const sessionRes = await axios.post(
                `${GLPI_API_URL}/initSession`,
                {},
                {
                    headers: {
                        "App-Token": GLPI_APP_TOKEN,
                        "Authorization": `user_token ${GLPI_USER_TOKEN}`
                    }
                }
            );
            const sessionToken = sessionRes?.data?.session_token;
            if (!sessionToken) {
                return reply.send({ erro: "Não foi possível obter o session_token do GLPI." });
            }
            console.log('Sessão Token gerada com sucesso: ' + sessionToken);
    

            // 2. Buscar ticket
            try {
                const ticketRes = await axios.get(
                    `${GLPI_API_URL}/Ticket/${ticket}`,
                    {
                        headers: {
                            "App-Token": GLPI_APP_TOKEN,
                            "Session-Token": sessionToken,
                        }
                    }
                );
                const { id, name, date, content, users_id_lastupdater } = ticketRes.data;

                // Buscar nome completo do usuário que atendeu
                let atendente = null;
                if (users_id_lastupdater) {
                    try {
                        const userRes = await axios.get(
                            `${GLPI_API_URL}/User/${users_id_lastupdater}`,
                            {
                                headers: {
                                    "App-Token": GLPI_APP_TOKEN,
                                    "Session-Token": sessionToken,
                                }
                            }
                        );
                        const { firstname: firstname, realname } = userRes.data;
                        atendente = `${firstname} ${realname}`.trim();
                    } catch (userErr: any) {
                        atendente = null;
                    }
                }

                return reply.send({
                    message: 'Ticket encontrado com sucesso: ' + id,
                    ticket: {
                        id,
                        name: decode(name),
                        date,
                        content: decode(content),
                        atendente
                    }
                });
            } catch (err: any) {
                return reply.send({ erro: err?.response?.data?.message || err.message || "Erro ao buscar ticket no GLPI" });
            }
        } catch (error: any) {
            return reply.send({ erro: error?.response?.data?.message || error.message || "Erro ao consultar GLPI" });
        }
    });
}