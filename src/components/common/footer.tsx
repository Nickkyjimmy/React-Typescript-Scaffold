export default function Footer() {
    return (
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>
      </footer>
    )
  }
  