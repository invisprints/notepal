import { Note } from "../parsers/model";
import nunjucks from "nunjucks";
import { flatMap, groupBy } from "lodash";
import { readwiseCSV } from "./readwiseCSV";

const templates = {
  readwiseCSV,
} as Record<string, string>;

function escapeCSVField(field: string): string {
  if (field && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function transformNote(
  notes: Note[],
  template: string,
  fromString: boolean
) {
  const flatNotes = flatMap(notes, (note) => note.children);
  const env = new nunjucks.Environment();
  env.addFilter('escapeCSV', escapeCSVField);
  return env.renderString(fromString ? template : templates[template], {
    notes: flatNotes,
  }).trim();
}
