import type { ContactSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for contact submissions
export interface IStorage {
  createContactSubmission(submission: ContactSubmission): Promise<ContactSubmission & { id: string }>;
  getContactSubmissions(): Promise<(ContactSubmission & { id: string })[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<string, ContactSubmission & { id: string }>;

  constructor() {
    this.contactSubmissions = new Map();
  }

  async createContactSubmission(submission: ContactSubmission): Promise<ContactSubmission & { id: string }> {
    const id = randomUUID();
    const record = { ...submission, id };
    this.contactSubmissions.set(id, record);
    return record;
  }

  async getContactSubmissions(): Promise<(ContactSubmission & { id: string })[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
