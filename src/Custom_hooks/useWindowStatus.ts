"use client"
import { useState, useEffect } from "react"

export default function useWindowStatus() {
    const [windowStatus, setWindowStatus] = useState("desktop")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const determineWindowStatus = () =>
                window.innerWidth < 450
                    ? "mobile"
                    : window.innerWidth < 1024
                      ? "tablet"
                      : "desktop"
            setWindowStatus(determineWindowStatus())
            const checkWindowSize = () =>
                setWindowStatus(determineWindowStatus())
            window.addEventListener("resize", checkWindowSize)

            return () => window.removeEventListener("resize", checkWindowSize)
        }
    }, [])

    return windowStatus
}
