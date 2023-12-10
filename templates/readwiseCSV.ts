function escapeCSVField(field) {
  if (field && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export const readwiseCSV = `Highlight,Title,Author,URL,Note
{% for note in notes %}
{{ note.highlight | escapeCSV }},{{ note.bookName | escapeCSV }},{{ note.author | escapeCSV }}, , {{ note.sideNote | trim | escapeCSV }}
{% endfor %}`;
