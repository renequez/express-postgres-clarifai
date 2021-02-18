import Clarifai from 'clarifai';

const clarifai = new Clarifai.App({
	apiKey: '21ce92ca08954d38a14c7743692a104b',
});

export const handleApiCall = (req, res) => {
	clarifai.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.inputValue)
		.then((data) => res.json(data))
		.catch((err) => res.status(400).json('unable to work with clarifai'));
};

export const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json('unable to get entries'));
};
