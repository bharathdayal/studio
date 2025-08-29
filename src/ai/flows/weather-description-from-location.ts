'use server';
/**
 * @fileOverview An AI agent that fetches the current weather conditions for a given location.
 *
 * - getWeatherDescriptionFromLocation - A function that fetches the weather description based on location.
 * - WeatherDescriptionFromLocationInput - The input type for the getWeatherDescriptionFromLocation function.
 * - WeatherDescriptionFromLocationOutput - The return type for the getWeatherDescriptionFromLocation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherDescriptionFromLocationInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type WeatherDescriptionFromLocationInput = z.infer<typeof WeatherDescriptionFromLocationInputSchema>;

const WeatherDescriptionFromLocationOutputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  description: z.string().describe('A short textual description of the weather conditions.'),
  icon: z.string().describe('An icon representing the weather conditions (e.g., sunny, cloudy, rainy).'),
  windIcon: z.string().describe('An icon representing the wind conditions.'),
});
export type WeatherDescriptionFromLocationOutput = z.infer<typeof WeatherDescriptionFromLocationOutputSchema>;

export async function getWeatherDescriptionFromLocation(input: WeatherDescriptionFromLocationInput): Promise<WeatherDescriptionFromLocationOutput> {
  return weatherDescriptionFromLocationFlow(input);
}

const weatherPrompt = ai.definePrompt({
  name: 'weatherPrompt',
  input: {schema: WeatherDescriptionFromLocationInputSchema},
  output: {schema: WeatherDescriptionFromLocationOutputSchema},
  prompt: `You are a helpful weather assistant. Given the location (latitude and longitude), provide a summary of the current weather conditions including temperature in Celsius, a textual description, a weather icon, and a wind icon. Return in JSON format.

Latitude: {{latitude}}
Longitude: {{longitude}}`,
});

const weatherDescriptionFromLocationFlow = ai.defineFlow(
  {
    name: 'weatherDescriptionFromLocationFlow',
    inputSchema: WeatherDescriptionFromLocationInputSchema,
    outputSchema: WeatherDescriptionFromLocationOutputSchema,
  },
  async input => {
    const {output} = await weatherPrompt(input);
    return output!;
  }
);
