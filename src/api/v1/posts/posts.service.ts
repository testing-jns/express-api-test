import type { Post } from '@prisma/client';

import { Prisma } from '@prisma/client';

import PrismaError from '@/errors/PrismaError';

import * as postRepository from './posts.repository';

type CreatePostInput = {
  slug: string;
  title: string;
  userId: string;
  thumbnail: string;
  content: string;
  categoryId: string;
  tags: string[];
};

type UpdatePostInput = {
  slug: string;
  title?: string;
  thumbnail?: string;
  content?: string;
  categoryId?: string;
  tags?: string[];
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await postRepository.findAll();
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  return await postRepository.findBySlug(slug);
};

export const getPostByTitleOrSlug = async (
  title: string,
  slug: string,
): Promise<Post | null> => {
  return await postRepository.findByTitleOrSlug(title, slug);
};

export const createPost = async (
  post: CreatePostInput,
): Promise<Post | null | void> => {
  try {
    const { tags, ...data } = post;
    return await postRepository.create({
      ...data,
      tags: { connect: tags.map((tagId: string) => ({ id: tagId })) },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating post');
    }
  }
};

export const updatePost = async (
  post: UpdatePostInput,
): Promise<Post | null | void> => {
  try {
    const { slug, tags, ...data } = post;

    return await postRepository.update(slug, {
      ...data,
      ...(tags
        ? { tags: { connect: tags.map((tagId: string) => ({ id: tagId })) } }
        : {}),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError('Error creating post');
    }
  }
};

export const deletePost = async (slug: string): Promise<Post | null> => {
  return await postRepository.deleteBySlug(slug);
};
