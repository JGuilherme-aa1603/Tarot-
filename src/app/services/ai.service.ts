import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { environment } from '../../environments/environment';
import { Card } from '../data/tarot-cards';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private openai: OpenAI;

  constructor() {
    // Inicializar cliente OpenAI com a API Key
    this.openai = new OpenAI({
      apiKey: environment.openaiApiKey,
      dangerouslyAllowBrowser: true, // Necessário para usar no frontend (não recomendado para produção)
    });
  }

  /**
   * Gera uma leitura de tarô baseada na pergunta e nas cartas selecionadas
   * @param question - Pergunta do usuário
   * @param cards - Array com as 3 cartas selecionadas
   * @returns Promise com a interpretação gerada pela IA
   */
  async generateReading(question: string, cards: Card[]): Promise<string> {
    try {
      // Construir o prompt para a IA
      const prompt = this.buildPrompt(question, cards);

      // Chamar a API da OpenAI
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Modelo mais barato e rápido
        messages: [
          {
            role: 'system',
            content: `Você é um tarólogo experiente e sábio. Sua função é interpretar cartas de tarô de forma profunda, empática e insightful. 
            Faça leituras que conectem os significados das cartas com a pergunta específica do consulente. 
            Use uma linguagem acessível mas profissional, e sempre ofereça perspectivas construtivas.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8, // Criatividade moderada
        max_tokens: 800, // Limite de tokens para a resposta
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
      });

      // Extrair e retornar a resposta
      const reading =
        response.choices[0]?.message?.content ||
        'Desculpe, não foi possível gerar a leitura no momento. Tente novamente.';

      return reading;
    } catch (error: any) {
      console.error('❌ Erro ao gerar leitura:', error);

      // Tratar erros específicos
      if (error.status === 401) {
        throw new Error('API Key inválida. Verifique sua configuração.');
      } else if (error.status === 429) {
        throw new Error('Limite de requisições excedido. Aguarde um momento e tente novamente.');
      } else if (error.status === 500) {
        throw new Error('Erro no servidor da OpenAI. Tente novamente em alguns instantes.');
      } else {
        throw new Error(
          `Erro ao conectar com o serviço de IA: ${error.message || 'Verifique sua conexão.'}`
        );
      }
    }
  }

  /**
   * Constrói o prompt que será enviado para a IA
   */
  private buildPrompt(question: string, cards: Card[]): string {
    const cardsDescription = cards
      .map((card, index) => {
        const position = ['Passado', 'Presente', 'Futuro'][index];
        return `
**Carta ${index + 1} (${position}): ${card.name} (${card.roman})**
Significado: ${card.description}`;
      })
      .join('\n');

    return `
Faça uma leitura de tarô para a seguinte pergunta:

**Pergunta do Consulente:** "${question}"

**Cartas Selecionadas (Tiragem de 3 Cartas):**
${cardsDescription}

**Instruções para a Leitura:**
1. Interprete cada carta no contexto de sua posição (Passado, Presente, Futuro)
2. Conecte os significados das cartas com a pergunta específica
3. Ofereça insights práticos e construtivos
4. Use uma estrutura clara: introdução, análise de cada carta, síntese final
5. Mantenha um tom empático e encorajador
6. Seja específico ao relacionar as cartas com a situação perguntada

Formato esperado:
- Um parágrafo introdutório
- Análise de cada carta (2-3 parágrafos)
- Conclusão com síntese e orientação (1-2 parágrafos)
`;
  }
}
