import { createClient } from 'pexels';
const apikey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apikey);
export async function getPhotoURL(
	searchQuery: string,
	size: string = 'tiny'
): Promise<string | undefined | null> {
	try {
		const photos = await client.photos.search({
			query: searchQuery,
			size: size,
			per_page: 3,
			page: 1
		});
		if ('photos' in photos) {
			const randomIndex = Math.floor(Math.random() * photos.photos.length);

			const resultID = photos.photos[randomIndex].id;
			const response = await client.photos.show({ id: resultID });
			if ('url' in response) {
				return (response.src as { [key: string]: string })[size];
			} else {
				console.error('Error fetching photo:', response);
			}
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
}
