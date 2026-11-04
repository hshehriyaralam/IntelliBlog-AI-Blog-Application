export type AIProvider = {
  name: string;
  model: string;
  key: string;
};

export async function runWithProviderFallback<T>(
  providers: AIProvider[],
  run: (provider: AIProvider) => Promise<T>
) {
  let lastError: unknown;
  for (const provider of providers) {
    try {
      return await run(provider);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No AI provider succeeded");
}
