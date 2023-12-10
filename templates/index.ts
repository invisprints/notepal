import { Note } from "../parsers/model";
import nunjucks from "nunjucks";
import { flatMap, groupBy } from "lodash";
import { readwiseCSV } from "./readwiseCSV";

const templates = {
  readwiseCSV,
} as Record<string, string>;

function escapeCSVField(field: string): nunjucks.runtime.SafeString {
  let escapedField = field;
  if (field && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
    escapedField = `"${field.replace(/"/g, '""')}"`;
  }
  return new nunjucks.runtime.SafeString(escapedField);
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
