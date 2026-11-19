import { defineField, defineType } from "sanity";

export const versionSnapshot = defineType({
  name: "versionSnapshot",
  title: "Version Snapshot",
  type: "document",
  fields: [
    defineField({
      name: "documentId",
      title: "Document ID",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "documentType",
      title: "Document Type",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "versionNumber",
      title: "Version Number",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trigger",
      title: "Snapshot Trigger",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "publish" },
          { title: "Saved Version", value: "manual" },
          { title: "Pre-Restore Safety", value: "pre-restore" },
        ],
      },
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Version Note",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "contentJson",
      title: "Document Content (JSON)",
      type: "text",
      rows: 10,
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      docId: "documentId",
      vNum: "versionNumber",
      trigger: "trigger",
      createdAt: "_createdAt",
    },
    prepare({ docId, vNum, trigger, createdAt }) {
      return {
        title: `v${vNum} · ${trigger} (${docId?.slice(0, 8)})`,
        subtitle: createdAt ? new Date(createdAt).toLocaleString() : undefined,
      };
    },
  },
});
