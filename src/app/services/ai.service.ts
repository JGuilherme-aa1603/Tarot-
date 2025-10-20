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
    this.openai = new OpenAI({
      apiKey: environment.openaiApiKey,
      dangerouslyAllowBrowser: true,
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

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é um tarólogo experiente e sábio. Sua função é interpretar cartas de tarô de forma profunda. 
            Faça leituras que conectem os significados das cartas com a pergunta específica do consulente. 
            Use uma linguagem acessível mas profissional.`,
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
        const roman = card.roman || '(sem número)';
        return `\n**Carta ${index + 1}: ${card.name} (${roman})**\nSignificado: ${card.description}`;
      })
      .join('\n');

    return `Não escreva nenhuma introdução, vá direto ao formato abaixo.

## Análise das 3 cartas

${cardsDescription}

## Resposta para a pergunta

Forneça uma resposta direta e objetiva para a pergunta do consulente (1-2 parágrafos). Não inclua saudações, avisos, nem referências a "passado/presente/futuro".

**Pergunta do Consulente:** "${question}"

Instruções adicionais:
- Para cada carta, escreva um subtítulo em negrito com o nome da carta (por exemplo: **Carta 1: Louco (0)**) e depois a análise (1-2 parágrafos).
- Mantenha a linguagem clara, prática e específica ao contexto da pergunta.
- Não adicione uma seção de introdução; comece já com "## Análise das 3 cartas".
- Termine com a seção "## Resposta para a pergunta" contendo a conclusão.
- Leve mais em consideração a interpretação das cartas, de acordo com a pergunta, do que seus significados.
`;
  }
}
