import { useEffect, useState } from "react";

export default function AuthController() {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<null>(null);

    useEffect(() => {}, []);

    return { loading }
}