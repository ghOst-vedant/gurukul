import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div>
        <h1>Page not found</h1>
        <p>Return to <Link href="/">Homepage</Link></p>
    </div>
  )
}

export default NotFoundPage
