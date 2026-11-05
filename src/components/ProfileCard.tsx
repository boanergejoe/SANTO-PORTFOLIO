import { motion } from "framer-motion";
import { useState } from "react";
import { Fingerprint, Sparkles } from "lucide-react";
import { site } from "../data/portfolio";

export function ProfileCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="profile-stage">
      <motion.div
        className="lanyard"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      ><span /></motion.div>
      <motion.button
        className="profile-card"
        type="button"
        aria-label="Flip profile card"
        onClick={() => setFlipped(!flipped)}
        drag
        dragConstraints={{ left: -20, right: 20, top: -16, bottom: 16 }}
        dragElastic={0.12}
        whileHover={{ y: -7, rotate: 0.5 }}
        whileTap={{ scale: 0.985 }}
      >
        <motion.div className="profile-card-inner" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.65 }}>
          <div className="profile-card-face profile-card-front">
            <div className="card-cover">
              <span className="card-camera" />
              <div className="portrait-ring">
                <img src={site.portrait} alt={site.name} />
              </div>
              <span className="online-dot" />
            </div>
            <div className="card-content">
              <h2>{site.name}</h2>
              <span className="job-pill">{site.role}</span>
              <div className="card-rule" />
              <div className="card-facts">
                <div><small>Specialty</small><strong>{site.specialty}</strong></div>
                <div><small>Location</small><strong>{site.location}</strong></div>
                <div><small>Experience</small><strong>{site.experience}</strong></div>
                <div>
                  <small>Status</small>
                  <strong className="active-status">● Active</strong>
                </div>
              </div>
              <div className="card-id">
                <span>{site.email}</span>
                <strong>{site.github.replace("https://github.com/", "@")}</strong>
              </div>
            </div>
          </div>
          <div className="profile-card-face profile-card-back">
            <Fingerprint size={50} />
            <span>{site.name}</span>
            <Sparkles size={26} />
            <p>
              {site.role} based in {site.location}.
            </p>
            <strong>{site.email}</strong>
          </div>
        </motion.div>
      </motion.button>
      <p className="card-hint">Drag or click the card</p>
    </div>
  );
}
