import { Router, Request, Response } from 'express';
import * as path from 'path';

/**
 * Router configuration for common route
 *
 * @class
 */
class DefaultRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	routes(): void {
		this.router.get('/api/documentation', (req: Request, res: Response) => {
			res.sendFile(path.join(__dirname, '../../public/apidoc/index.html'));
		});

		this.router.get('/', (req: Request, res: Response) => {
			if (process.env.NODE_ENV === 'production') {
				return res.sendFile(path.resolve(__dirname, '../../client', 'index.html'));
			}

			return res.json({ message: 'React Starter API' });
		});
	}
}

export { DefaultRouter };
