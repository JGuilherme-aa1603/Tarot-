# Configuração da API OpenAI

## Como configurar

1. **Obtenha sua API Key:**

   - Acesse: https://platform.openai.com/api-keys
   - Crie uma conta ou faça login
   - Clique em "Create new secret key"
   - Copie a chave (ela começa com `sk-proj-...`)

2. **Configure no projeto:**

   - Abra o arquivo `src/environments/environment.ts`
   - Substitua `'SUA_API_KEY_AQUI'` pela sua chave real
   - Exemplo: `openaiApiKey: 'sk-proj-abc123...'`

3. **⚠️ IMPORTANTE - Segurança:**
   - **NUNCA** comite o arquivo `environment.ts` no Git
   - O arquivo já está protegido no `.gitignore`
   - Para produção, use variáveis de ambiente do hosting (Vercel, Netlify, etc.)

## Custos

- A API da OpenAI é paga por uso
- Modelo recomendado: `gpt-4o-mini` (mais barato e rápido)
- Custo estimado: ~$0.001 por leitura de tarô
- Configure limites de gasto em: https://platform.openai.com/account/limits

## Alternativas Gratuitas (para testes)

Se não quiser gastar agora, pode usar:

- Mock/Simulação (respostas pré-definidas)
- Modelos locais (Ollama + Llama)
- Créditos gratuitos da OpenAI (novos usuários ganham $5)
