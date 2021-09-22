import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import "@material-tailwind/react/tailwind.css";

import black from "../../assets/img/black.jpg";
import widownew from "../../assets/img/widownew.jpg";
import cruella from "../../assets/img/cruella.jpg";
import cruellanew from "../../assets/img/cruellanew.jpg";
import satnhan from "../../assets/img/satnhan.jpg";
import candymannew from "../../assets/img/candymannew.jpg";

export default function News(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);

  return (
    <div>
      {/* component */}
      {/* Create By Joker Banny */}
      <div className="min-h-screen bg-gray-800 flex justify-center items-center py-20">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-8 md:space-y-0">
          <div className="max-w-sm  bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="mb-3 text-xl font-bold text-indigo-600">
              Black Widow
            </h3>
            <div className="relative">
              <img
                className="w-full rounded-xl shadow-xl"
                src={black}
                alt="Colors"
              />
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                HOT
              </p>
            </div>
            <p className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              The adventure follows Black Widow's past before joining
              S.H.I.E.L.D.
            </p>
            <div className="my-4">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p>180 Minutes</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p>Action, Fantasy, Adventure</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>
                <p>Cinema</p>
              </div>
              <Button
                className="mt-4 text-xl w-full text-white bg-indigo-600 rounded-xl shadow-lg"
                color=""
                type="button"
                onClick={(e) => setShowModal(true)}
              >
                Start Reading Now
              </Button>
            </div>
          </div>
          <Modal
            size="lg"
            active={showModal}
            toggler={() => setShowModal(false)}
          >
            <ModalHeader toggler={() => setShowModal(false)}>
              The adventure follows Black Window's past before joining
              S.H.I.E.L.D.{" "}
            </ModalHeader>
            <ModalBody>
              <p className="text-base leading-relaxed text-gray-600 font-normal">
                Before we talk about Black Widow, let us get one thing out of
                the way. Natasha Romanoff’s standalone film is not only many
                years too late, but the character also deserved a trilogy. With
                that being said, Black Widow, starring Scarlett Johansson, is
                the perfect send-off to our favorite superhero.
              </p>
              <div className="flex justify-center">
                <img src={widownew} alt="widownew"></img>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-600 font-normal">
                Black Widow has it all, from edge-of-the-seat action sequences,
                a heartfelt sibling dynamic, some great twists and also a big
                opening for the future of the MCU. However, it’s heartbreaking
                and unfair that as fans you watch the film knowing Natasha is
                going to be dead in the near future. This character deserved to
                have closure from her past and a continued bond with her loved
                ones (just like all the male superheroes do). It’s tragic that
                the only reason it didn’t happen was because the Studios didn’t
                have faith in a woman-led franchise.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => setShowModal(false)}
                ripple="dark"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <div className="max-w-sm  bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="mb-3 text-xl font-bold text-indigo-600">Cruella</h3>
            <div className="relative">
              <img
                className="w-full rounded-xl shadow-lg"
                src={cruella}
                alt="Colors"
              />
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                HOT
              </p>
            </div>
            <p className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              Before becoming the evil Cruella de Vil, who was Cruella?
            </p>
            <div className="my-4">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p>120 Minutes</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p>Comedy, Crime</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>
                <p>Cinema</p>
              </div>
              <Button
                className="mt-4 text-xl w-full text-white bg-indigo-600 rounded-xl shadow-lg"
                color=""
                type="button"
                onClick={(e) => setShowModal2(true)}
              >
                Start Reading Now
              </Button>
            </div>
          </div>
          <Modal
            size="lg"
            active={showModal2}
            toggler={() => setShowModal2(false)}
          >
            <ModalHeader toggler={() => setShowModal2(false)}>
              Before becoming the evil Cruella de Vil, who was Cruella?{" "}
            </ModalHeader>
            <ModalBody>
              <p className="text-base leading-relaxed text-gray-600 font-normal">
                The actress plays 'One Hundred and One Dalmatians' villain
                Cruella de Vil in this origin story directed by Craig Gillespie
                and co-starring Emma Thompson.
              </p>
              <div className="flex justify-center">
                <img src={cruellanew} alt="cruellanew" />
              </div>
              <p className="text-base leading-relaxed text-gray-600 font-normal mt-4">
                In case you needed reminding: The One Hundred and One Dalmatians
                franchise has never been about the dogs. No — its real star is
                Cruella de Vil, the acerbic, deliciously biting antagonist with
                an unhinged fur obsession. Betty Lou Gerson voiced the character
                in the 1961 Disney animated film, investing the villain with
                wit, haughtiness and an understated charm. Glenn Close came next
                in 1996’s live-action 101 Dalmatians, all but — excuse the
                hyperbole — revolutionizing the role. Cruella, in Close’s claws,
                was sharper, more menacing and, with her untamed, two-tone
                black-and-white hair, scarlet lipstick and maniacal laugh,
                frankly iconic. To fill her shoes — or should I say her furs —
                is a daunting undertaking. But it’s one Emma Stone tackles with
                admirable hustle and considerable charisma in Disney’s new
                Cruella.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => setShowModal2(false)}
                ripple="dark"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <div className="max-w-sm  bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 className="mb-3 text-xl font-bold text-indigo-600">Candyman</h3>
            <div className="relative">
              <img
                className="w-full rounded-xl shadow-lg"
                src={satnhan}
                alt="Colors"
              />
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                HOT
              </p>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">
              Haunted by the fear of a supernatural killer with a hook
            </h1>
            <div className="my-4">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p>90 Minutes</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p>Horror, Thriller</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>
                <p>Cinema</p>
              </div>
              <Button
                className="mt-4 text-xl w-full text-white bg-indigo-600 rounded-xl shadow-lg"
                color=""
                type="button"
                onClick={(e) => setShowModal3(true)}
              >
                Start Reading Now
              </Button>
            </div>
          </div>
          <Modal
            size="lg"
            active={showModal3}
            toggler={() => setShowModal3(false)}
          >
            <ModalHeader toggler={() => setShowModal3(false)}>
              Haunted by the fear of a supernatural killer with a hook{" "}
            </ModalHeader>
            <ModalBody>
              <p className="text-base leading-relaxed text-gray-600 font-normal">
                CANDYMAN (2021) is back and we’re still encouraged to “Say his
                name!”. Preferably five times while looking into the mirror to
                summon him. The key, however, is to keep his name alive as we
                learned in the 1992 movie. You can’t be much of an urban legend
                if nobody hears about you.
              </p>
              <div className="flex justify-center">
                <img width="700" src={candymannew} alt="candymannew"></img>
              </div>
              <p className="mt-4 text-base leading-relaxed text-gray-600 font-normal">
                The 1992 movie had two sequels and became a trilogy of sorts.
                Just ignore the two sequels and focus on this one which is
                called a spiritual sequel. It’s also just a normal sequel that
                takes place almost three decades after the movie before it. More
                important is the fact that most of the cast and crew are made up
                of black talent this time around. I mean, honestly, it was
                pretty strange that this mythical character attacked black
                people. After all, his origin story was that he was a black man
                tortured and killed by white people. Wouldn’t he then be going
                after white folks? This is (in part!) the angle explored this
                time around.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="red"
                buttonType="link"
                onClick={(e) => setShowModal3(false)}
                ripple="dark"
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}
