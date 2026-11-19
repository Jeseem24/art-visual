export type SnapshotTrigger = "publish" | "manual" | "pre-restore";

export interface VersionSnapshotDocument {
  _id: string;
  _type: "versionSnapshot";
  _createdAt?: string;
  _updatedAt?: string;
  documentId: string;
  documentType: string;
  versionNumber: number;
  trigger: SnapshotTrigger;
  note?: string;
  authorName?: string;
  contentJson: string;
}

export interface VersionSnapshotItem {
  id: string;
  versionNumber: number;
  trigger: SnapshotTrigger;
  note?: string;
  authorName?: string;
  createdAt: string;
  contentJson: string;
}
