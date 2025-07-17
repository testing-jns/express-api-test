import type { Request } from 'express';
import type { ZodError, ZodIssue } from 'zod';

import fs from 'node:fs';
import path from 'node:path';

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getRandomElements(arr: any[], pick = 1): any[] {
  const selectedElements: any[] = [];

  for (let index = 0; index < pick; index++) {
    if (arr.length === 0) break;

    const randomIndex = Math.floor(Math.random() * arr.length);
    selectedElements.push(arr[randomIndex]);
  }

  return selectedElements;
}

export type ZodFormattedErrors = Record<string, string[]>;

export function formatZodErrors(err: ZodError): ZodFormattedErrors {
  return err.errors.reduce((acc: ZodFormattedErrors, issue: ZodIssue) => {
    const path: string = issue.path[0]?.toString() || '_global_';

    const message =
      path === '_global_'
        ? 'Request body is empty or malformed'
        : issue.message;

    if (!acc[path]) {
      acc[path] = [];
    }

    acc[path].push(message);

    return acc;
  }, {});
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An error occured';
}

export function readKeys(privateKeyPath: string, publicKeyPath: string) {
  try {
    const privateKey = fs.readFileSync(path.resolve(privateKeyPath), 'utf-8');
    const publicKey = fs.readFileSync(path.resolve(publicKeyPath), 'utf-8');
    return { privateKey, publicKey };
  } catch (err) {
    console.error('❌ Gagal membaca private key & public key file:', err);
    process.exit(1);
  }
}

type CreateSession = {
  userId: string;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
};

export const buildSessionPayload = (
  req: Request,
  userId: string,
  refreshToken: string,
): CreateSession => ({
  userId,
  refreshToken,
  userAgent: req.headers['user-agent'] || 'unknown',
  ipAddress: req.ip || 'unknown',
});
