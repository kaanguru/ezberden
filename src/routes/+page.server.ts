import { getPhotoURL } from '$lib/pexels';

export const actions = {
	default: async ({ request }) => {
		const { parolaOznesi } = await request.json();
		const smallPhotoURL = await getPhotoURL(parolaOznesi, 'small');
		return {
			body: { smallPhotoURL }
		};
	}
};
