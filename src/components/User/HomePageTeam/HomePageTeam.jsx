import React from 'react'
import './HomePageTeam.css'
import Image1 from '../../../assets/HomePageTeam/ImageContainer1.png'
import Image2 from '../../../assets/HomePageTeam/ImageContainer2.png'
import Image3 from '../../../assets/HomePageTeam/ImageContainer3.png'
import Image4 from '../../../assets/HomePageTeam/ImageContainer4.png'
import Image5 from '../../../assets/HomePageTeam/ImageContainer5.png'
import Image6 from '../../../assets/HomePageTeam/ImageContainer6.png'

const HomePageTeam = () => {
    const teamMembers = [
        {
            name: 'Shonali Deokule',
            role: 'Founder',
            imageUrl: Image1,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Vel lacus pellentesque et proin justo vulputate nunc ornare.',
        },
        {
            name: 'Wade Warren',
            role: 'Art Director',
            imageUrl: Image2,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Vel lacus pellentesque et proin justo vulputate nunc ornare.',
        },
        {
            name: 'Cameron Williamson',
            role: 'Brand Strategist',
            imageUrl: Image3,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie.',
        },
        {
            name: 'Abril Torres',
            role: 'User Researcher',
            imageUrl: Image4,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Vel lacus pellentesque et proin justo vulputate nunc ornare.',
        },
        {
            name: 'Kale Meadows',
            role: 'UX Designer',
            imageUrl: Image5,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie.',
        },
        {
            name: 'Max Mitchell',
            role: 'UI Designer',
            imageUrl: Image6,
            description:
                'Lorem ipsum dolor sit amet consectetur. Arcu posuere placerat eget libero molestie. Vel lacus pellentesque et proin justo vulputate nunc ornare.',
        },
    ]

    return (
        <div className="homepage-team-container bg-white py-8">
            <div className="heading-team-container">
                <p className="sub-heading-team">Meet Our Team</p>
                <p className="sub-sub-heading-team">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae nostrum magni obcaecati tempore illum, ea consectetur.
                    Eaque culpa odio nesciunt, esse nam voluptas alias incidunt
                    quisquam quam tenetur numquam natus!
                </p>
            </div>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <TeamMember key={index} {...member} />
                ))}
            </div>
        </div>
    )
}

const TeamMember = ({ name, role, description, imageUrl }) => {
    return (
        <div className="team-member">
            <div className="team-member-info">
                <h3>{name}</h3>
                <p>{role}</p>
                <img src={imageUrl} alt={name} className="team-member-image" />
                <p>{description}</p>
            </div>
        </div>
    )
}

export default HomePageTeam
