export function Footer() {
  return (
    <footer className="bg-[#0A142F] pb-14 pt-28 text-gray-300">
      <div className="container mx-auto grid grid-cols-1 gap-8 pb-8 text-sm md:grid-cols-4">
        <div>
          <h5 className="mb-4 font-bold text-white">Navigation</h5>
          <ul>
            <li className="mb-2">
              <a href="#">Home</a>
            </li>
            <li className="mb-2">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#">What We Do</a>
            </li>
            <li className="mb-2">
              <a href="#">To The Power of 10</a>
            </li>
            <li>
              <a href="#">Donate</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-white">What We Do</h5>
          <ul>
            <li className="mb-2">
              <a href="#">Encouraging Testing</a>
            </li>
            <li className="mb-2">
              <a href="#">Strengthening Advocacy</a>
            </li>
            <li className="mb-2">
              <a href="#">Sharing Information</a>
            </li>
            <li className="mb-2">
              <a href="#">Building Leadership</a>
            </li>
            <li className="mb-2">
              <a href="#">Engaging With Global Fund</a>
            </li>
            <li>
              <a href="#">Shining a Light</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-white">Legal</h5>
          <ul>
            <li className="mb-2">
              <a href="#">General Info</a>
            </li>
            <li className="mb-2">
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 font-bold text-white">Talk To Us</h5>
          <ul>
            <li className="mb-2">support@ercom.com</li>
            <li className="mb-2">+66 2399 1145</li>
            <li className="mb-2">
              <a href="#">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="#">Facebook</a>
            </li>
            <li className="mb-2">
              <a href="#">Linkedin</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © 2024 Lift Media. All Rights Reserved.
      </div>

      <div className="mt-4 flex justify-center space-x-6">
        <a href="#" className="text-gray-500 hover:text-white">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-white">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-white">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </footer>
  );
}
