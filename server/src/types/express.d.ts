declare global {
  namespace Express {
    interface Request {
      userId?: string;
      vendorId?: string;
    }
  }
}

export {};
