export const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);

	if (!email || !name || !password) {
		res.status(400).json('invalid form submission');
	}

	db.transaction((trx) => {
		trx('login')
			.insert({
				hash: hash,
				email: email,
			})
			.returning('email')
			.then((loginEmail) => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date(),
					})
					.then((user) => {
						res.json(user[0]);
					});
			})
			.then(trx.commit)
			.catch(trx.rollback);
	}).catch((err) => res.status(400).json(err));
};
