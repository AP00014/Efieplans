import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/pages/Portfolio.css";
import { supabase } from "../lib/supabase";
import type { Project } from "../types/index";

const ProjectGrid = ({
  selectedCategory,
  projects,
}: {
  selectedCategory: string;
  projects: Project[];
}) => {
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <motion.div
      className="projects-grid"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="projects-container">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
            <div className="project-info">
              <h4>{project.title}</h4>
              <p className="project-location">📍 {project.location}</p>
              <Link
                to={`/projects/${project.id}`}
                className="project-view-more"
                state={{ projectData: project }}
              >
                Explore
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const categories = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "town-houses", label: "Town Houses" },
  { id: "group-dualling", label: "Group Dualling" },
];

const CategoryFilter = ({ projects }: { projects: Project[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(categoryId === "all" ? {} : { category: categoryId });
  };

  const getSlidesToShow = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 480) return Math.min(categories.length, 3);
      if (window.innerWidth <= 768) return Math.min(categories.length, 3);
      if (window.innerWidth <= 1024) return Math.min(categories.length, 3);
      return Math.min(categories.length, 4);
    }
    return Math.min(categories.length, 4);
  }, []);

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSlidesToShow]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(categories.length, 3),
          arrows: true,
        },
      },
    ],
  };

  return (
    <motion.div
      className="category-filter"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="filter-tabs"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.3,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <button
                className={`filter-tab ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  width: "100%",
                  margin: "0 5px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "25px",
                  backgroundColor:
                    selectedCategory === category.id ? "#007bff" : "#f8f9fa",
                  color: selectedCategory === category.id ? "#fff" : "#333",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = "#e9ecef";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }
                }}
              >
                {category.label}
              </button>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
      <ProjectGrid selectedCategory={selectedCategory} projects={projects} />
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const PROJECTS_PER_PAGE = 12;

  const fetchProjects = useCallback(async (loadMore = false, currentProjects?: Project[]) => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const from = loadMore ? currentProjects!.length : 0;
      const to = from + PROJECTS_PER_PAGE - 1;

      // First, let's check if any projects exist at all
      console.log("Checking if any projects exist...");
      const { data: allProjects, error: allError } = await supabase
        .from("projects")
        .select("id, title, created_at")
        .limit(5);

      console.log("All projects check:", { allProjects, allError });

      // Single query with count
      console.log(`Fetching projects from ${from} to ${to}`);
      const { data, error: fetchError, count } = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      console.log("Fetch result:", { data, error: fetchError, count });

      if (fetchError) throw fetchError;


      // Transform database data to match Project type
      const transformedProjects: Project[] = (data || []).map(
        (project) => {
          try {
            const transformed = {
              id: project.id,
              title: project.title,
              description: project.description,
              status: project.status as "completed" | "ongoing",
              image: project.image,
              location: project.location,
              category: project.category || undefined,
              details: project.details || {
                specifications: {},
                timeline: undefined,
                materials: undefined,
                features: undefined,
                imageGallery: undefined,
                blueprints: undefined,
                videos: undefined,
                virtualTour: undefined,
              },
              created_at: project.created_at,
              updated_at: project.updated_at,
              created_by: project.created_by,
            };
            return transformed;
          } catch (error) {
            console.error("Error transforming project:", error, project);
            return null;
          }
        }
      ).filter(Boolean) as Project[];


      if (loadMore) {
        setProjects((prev) => [...prev, ...transformedProjects]);
      } else {
        setProjects(transformedProjects);
      }

      // Calculate hasMore based on current total and fetched count
      const currentTotal = loadMore
        ? currentProjects!.length + transformedProjects.length
        : transformedProjects.length;
      setHasMore(currentTotal < (count || 0));
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching projects:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load projects";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const loadMore = () => {
    fetchProjects(true, projects);
  };

  if (loading) {
    return (
      <motion.div
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div className="loading-spinner" style={{ margin: "0 auto" }}></div>
          <p>Loading projects...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ color: "red" }}>Error: {error}</p>
          <button
            onClick={() => fetchProjects()}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* <motion.section
        className="headerSliderContainer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="headerSliderTrack" style={{ height: '40vh' }}>
          <motion.div
            className="headerControls"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="headerControlBtn"
              onClick={() => handleNavigation('prev')}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 140, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowLeft />
            </motion.button>
            <motion.button
              className="headerControlBtn"
              onClick={() => handleNavigation('next')}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255, 140, 0, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <FiArrowRight />
            </motion.button>
          </motion.div>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeSlide}
              className="headerSlide"
              initial={{ opacity: 0, x: slideDirection === 'next' ? '100%' : '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === 'next' ? '-100%' : '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.div
                className="headerSlideVisual"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.img
                  src={featuredProjects[activeSlide].image}
                  alt=""
                  className="headerSlideImg"
                  loading="lazy"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.span
                  className={`headerStatus ${featuredProjects[activeSlide].status}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {featuredProjects[activeSlide].status}
                </motion.span>
              </motion.div>

              <motion.div
                className="headerSlideContent"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h3
                  className="headerSlideTitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {featuredProjects[activeSlide].title}
                </motion.h3>
                <motion.p
                  className="headerSlideDesc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {featuredProjects[activeSlide].description}
                </motion.p>
                <motion.div
                  className="headerSlideMeta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="headerLocation">📍 {featuredProjects[activeSlide].location}</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/projects/${featuredProjects[activeSlide].id}`}
                      className="slide-view-more"
                      state={{ projectData: featuredProjects[activeSlide] }}
                    >
                      View More →
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="headerProgress"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {featuredProjects.map((_, index) => (
            <motion.button
              key={index}
              className={`headerProgressDot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + 0.9,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>
      </motion.section> */}
      <CategoryFilter projects={projects} />

      {hasMore && (
        <motion.div
          className="load-more-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="load-more-btn"
          >
            {loadingMore ? (
              <>
                <div className="loading-spinner-small"></div>
                Loading...
              </>
            ) : (
              "Load More Projects"
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;

