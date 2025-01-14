function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-5 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RunHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
