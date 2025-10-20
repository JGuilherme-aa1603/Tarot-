import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdownToHtml',
  standalone: true
})
export class MarkdownToHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    let html = value;

    // Converter ### Título em <h3>
    html = html.replace(/### (.+)/g, '<h3>$1</h3>');

    // Converter ## Título em <h2>
    html = html.replace(/## (.+)/g, '<h2>$1</h2>');

    // Converter **texto** em <strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Converter *texto* em <em>
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Converter quebras de linha duplas em parágrafos
    html = html.split('\n\n').map(paragraph => {
      if (paragraph.trim()) {
        // Se já não for um h2/h3, envolver em <p>
        if (!paragraph.trim().startsWith('<h')) {
          return `<p>${paragraph.trim()}</p>`;
        }
        return paragraph;
      }
      return '';
    }).join('');

    // Converter quebras de linha simples em <br>
    html = html.replace(/\n/g, '<br>');

    return html;
  }
}
