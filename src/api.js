export const NASA_API = {
  count: 10,
  apiKey: 'DEMO_KEY',
  get apiUrl() {
    return `https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}&count=${this.count}`;
  },
};
