'use server';

import { setUserDefaultModel } from "@/lib/server";

export async function setDefaultModel(model: string) {
  setUserDefaultModel(model);
}