/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.medicall.pk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'https://www.medicall.pk/medi-app-api/login', // Replace with the actual API URL
      },
      {
        source: '/api/login_social',
        destination: 'https://www.medicall.pk/medi-app-api/login-social', // Replace with the actual API URL
      },
      {
        source: '/api/register',
        destination: 'https://www.medicall.pk/medi-app-api/register-doctor', // Replace with the actual API URL
      },
      {
        source: '/api/update',
        destination: 'https://www.medicall.pk/medi-app-api/auth/doctor/profile/update', // Replace with the actual API URL
      },
      {
        source:'/api/getMcqs',
        destination:'https://www.medicall.pk/medi-app-api/get-subjects-for-mcqs'
      },
      {
        source:'/api/guideData',
        destination:'https://www.medicall.pk/medi-app-api/medistudy/med/guidelines/get'
      },
      {
        source:'/api/getGuide',
        destination:'https://www.medicall.pk/medi-app-api/medistudy/specialities/guidelines/get'
      },
      {
        source:'/api/get_past_paper',
        destination:'https://www.medicall.pk/medi-app-api/past-papers/program/get'
      },
      {
        source:'/api/get_past_paper_mcqs',
        destination:'https://www.medicall.pk/medi-app-api/past-papers/get-mcqs'
      },
      {
        source:'/api/get_CoreData',
        destination:'https://www.medicall.pk/medi-app-api/get-medistudy-core-list'
      },
      {
        source:'/api/subjects_units',
        destination:'https://www.medicall.pk/medi-app-api/mcqs/subjects/get'
      },
      {
        source:'/api/get_mcqs',
        destination:'https://www.medicall.pk/medi-app-api/get-subject-wise-mcqs'
      },
      {
        source:'/api/get_flash_cards',
        destination:'https://www.medicall.pk/medi-app-api/get-flash-cards'
      },  
      {
        source:'/api/get_guidelines',
        destination:'https://www.medicall.pk/medi-app-api/medistudy/med/guidelines/get'
      },
       {
        source:'/api/set_bookmark_mcq',
        destination:'https://www.medicall.pk/medi-app-api/bookmark-mcq'
      },
      {
        source:'/api/get_bookmarked_mcqs',
        destination:'https://www.medicall.pk/medi-app-api/get-bookmarked-mcqs'
      },
      {
        source:'/api/set_unbookmark_mcq',
        destination:'https://www.medicall.pk/medi-app-api/mcq/unbookmark'
      },
      {
        source:'/api/set_mcq_note',
        destination:'https://www.medicall.pk/medi-app-api/notes-mcq'
      },
      {
        source:'/api/search_mcqs',
        destination:'https://www.medicall.pk/medi-app-api/search/mcqs'
      },
      {
        source:'/api/get_mock_test',
        destination:'https://www.medicall.pk/medi-app-api/get-mock-test-mcqs'
      },
      {
        source:'/api/check_email',
        destination:'https://www.medicall.pk/medi-app-api/forgot-password'
      },
      {
        source:'/api/mock_mcqs',
        destination:'https://www.medicall.pk/medi-app-api/get-mock-test-mcqs'
      },
      
    ];
    
  },
};