Youtube_Clone_2025
Overview
The YouTube Clone App 2025 is a full-stack web application replicating core YouTube functionalities, built using Django for the backend and React for the frontend. Hosted on an IONOS VPS server with Nginx as a reverse proxy for the React application, it leverages the YouTube Data API for enhanced features like video search and metadata retrieval. The project is accessible at youtubecloneapp.wisecarver.site and builds upon provided starter code to deliver a robust, scalable platform.
Features

User Authentication: Secure login/signup with email/password, using JSON Web Token (JWT) for session management.
Video Management: Upload, stream, and delete videos, with server-side storage managed by Django.
Search Functionality: Search videos by keywords, powered by the YouTube Data API for real-time results and suggestions.
Social Interactions: Like, dislike, comment on videos, and subscribe to channels.
Responsive UI: React-based interface with React Router for seamless navigation, optimized for desktop and mobile.
Theme Support: Toggle between light and dark modes for user comfort.

Technologies

Backend:
Django: Web framework for server-side logic and database management.
Django REST Framework: Builds RESTful APIs for frontend communication.
JSON Web Token (JWT): Secure user authentication and session handling.


Frontend:
React.js: Dynamic, component-based UI with hooks for state management.
React Router: Client-side routing for page navigation.


Integration:
YouTube Data API: Enhances video search and metadata capabilities.


Deployment:
IONOS VPS: Hosts the application with scalable server resources.
Nginx: Acts as a reverse proxy for the React frontend, ensuring efficient request handling and static file serving.
Gunicorn: WSGI server for running the Django backend.



Project Structure
youtube-clone-2025/
├── backend/
│   ├── manage.py              # Django project management script
│   ├── youtube_clone/
│   │   ├── settings.py       # Django configuration
│   │   ├── urls.py           # API routes
│   │   └── wsgi.py           # WSGI entry point
│   ├── apps/
│   │   ├── users/            # User authentication models and views
│   │   ├── videos/           # Video management models and views
│   └── requirements.txt       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components (Home, Video, Search)
│   │   ├── App.js            # Main React component
│   │   └── index.js          # Frontend entry point
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Environment variables
├── nginx/
│   └── youtube_clone.conf    # Nginx configuration
└── README.md                 # Project documentation

Setup and Installation
Prerequisites

Python 3.8+
Node.js 14.x+
IONOS VPS account
YouTube Data API key (from Google Cloud Console)
Git

Backend Setup

Clone the repository:git clone https://github.com/WiseTechLTS/Youtube_Clone_2025.git
cd youtube-clone-2025/backend


Install dependencies:pip install -r requirements.txt


Create a .env file in the backend/ directory:SECRET_KEY=your_django_secret_key
DEBUG=False
DATABASE_URL=sqlite:///db.sqlite3  # Or your database URL


Run migrations:python manage.py migrate


Create a superuser:python manage.py createsuperuser


Start the backend (for development):python manage.py runserver



Frontend Setup

Navigate to the frontend directory:cd youtube-clone-2025/frontend


Install dependencies:npm install


Create a .env file in the frontend/ directory:REACT_APP_YT_API_KEY=your_youtube_api_key
REACT_APP_API_URL=http://localhost:8000/api


Start the frontend (for development):npm start


Access the app at http://localhost:3000.

Deployment on IONOS VPS

Server Setup:
Provision an IONOS VPS with Ubuntu.
Install dependencies: Python, Node.js, Nginx, Gunicorn.

sudo apt update
sudo apt install python3-pip python3-venv nodejs npm nginx
pip install gunicorn


Backend Deployment:
Upload the backend code to /var/www/youtube_clone/backend.
Set up a virtual environment:python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


Run migrations and collect static files:python manage.py migrate
python manage.py collectstatic


Configure Gunicorn:gunicorn --bind 0.0.0.0:8000 youtube_clone.wsgi


Set up a systemd service for Gunicorn:[Unit]
Description=Gunicorn instance for YouTube Clone
After=network.target
[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/youtube_clone/backend
ExecStart=/var/www/youtube_clone/backend/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 youtube_clone.wsgi:application
[Install]
WantedBy=multi-user.target

Save as /etc/systemd/system/gunicorn.service, then:sudo systemctl start gunicorn
sudo systemctl enable gunicorn




Frontend Deployment:
Build the React app:cd /var/www/youtube_clone/frontend
npm install
npm run build


Move the build to /var/www/youtube_clone/frontend/build.


Nginx Configuration:
Create /etc/nginx/sites-available/youtube_clone.conf:server {
    listen 80;
    server_name youtubecloneapp.wisecarver.site;

    location / {
        root /var/www/youtube_clone/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static/ {
        alias /var/www/youtube_clone/backend/static/;
    }
}


Enable the configuration:sudo ln -s /etc/nginx/sites-available/youtube_clone.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx




Verify Deployment:
Visit youtubecloneapp.wisecarver.site to confirm the app is running.



API Endpoints



Endpoint
Method
Description



/api/auth/login
POST
Login with email/password


/api/auth/signup
POST
Register a new user


/api/videos
GET
Fetch all videos


/api/videos
POST
Upload a new video


/api/videos/:id
GET
Fetch a specific video


/api/videos/:id/like
POST
Like a video


/api/videos/:id/comment
POST
Add a comment to a video


/api/channels/:id/subscribe
POST
Subscribe to a channel


Usage

Sign Up/Login: Create an account or log in using email/password.
Upload Videos: Use the upload form to add videos with metadata.
Search Videos: Enter keywords to find videos, enhanced by YouTube Data API.
Interact: Like, comment, or subscribe to channels.
Toggle Theme: Switch between light and dark modes.

Contributing

Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit changes: git commit -m 'Add feature'.
Push to the branch: git push origin feature-name.
Submit a pull request.

License
MIT License
Acknowledgments

Inspired by YouTube's design and functionality.
Built with guidance from Django, React, and YouTube Data API documentation.
Thanks to the open-source community for tools and libraries.
