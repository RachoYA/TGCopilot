import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';

declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}

export function setupAuth(app: express.Express) {
  const secret = process.env.SESSION_SECRET || 'secret';
  app.use(session({ secret, resave: false, saveUninitialized: false }));
  app.post('/login', express.json(), async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 'admin';
    const hash = process.env.ADMIN_HASH || '';
    if (username === adminUser && hash && await bcrypt.compare(password, hash)) {
      req.session.user = adminUser;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'invalid credentials' });
    }
  });

  app.post('/logout', (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'unauthorized' });
  }
}
