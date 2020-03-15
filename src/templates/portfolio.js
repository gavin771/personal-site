import React from "react";
import _ from "lodash";
import ReactTooltip from "react-tooltip";

import { Layout } from "../components/index";
import { htmlToReact, Link, safePrefix } from "../utils";

export default class Project extends React.Component {
  render() {
    let display_projects = _.get(
      this.props,
      "pageContext.frontmatter.projects"
    );
    return (
      <Layout {...this.props}>
        <header className="post-header">
          <h1 className="post-title underline">
            {_.get(this.props, "pageContext.frontmatter.title")}
          </h1>
        </header>
        {_.get(this.props, "pageContext.frontmatter.subHeading") && (
          <div className="post-subtitle">
            {htmlToReact(
              _.get(this.props, "pageContext.frontmatter.subHeading")
            )}
          </div>
        )}
        <div className="project-feed">
          {_.map(display_projects, (project, project_idx) => {
            const sourceCodeExists =
              safePrefix(_.get(project, "sourceCodeLink")) !== "/";
            const liveAppExists =
              safePrefix(_.get(project, "liveApplicationLink")) !== "/";
            return (
              project.title && (
                <article key={project_idx} className="project">
                  <div className="post-inside">
                    <img
                      className="thumbnail"
                      src={safePrefix(_.get(project, "image"))}
                      alt={_.get(project, "title")}
                    />
                    <header className="post-header">
                      <h2 className="post-title">{_.get(project, "title")}</h2>
                    </header>
                    <div className="post-content">
                      <p>{_.get(project, "longDescription")}</p>
                      <div style={{ textAlign: "center" }}>
                        {_.get(project, "tags").map((tag, tag_idx) => (
                          <span key={tag_idx} className="project-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <footer className="project-meta">
                      <React.Fragment>
                        <Link
                          data-tip={sourceCodeExists ? null : "tool"}
                          target={sourceCodeExists ? "_blank" : "_self"}
                          to={
                            sourceCodeExists
                              ? _.get(project, "sourceCodeLink")
                              : "#"
                          }
                          className={`button ${
                            sourceCodeExists ? "" : "disabled"
                          }`}
                        >
                          Source Code
                        </Link>
                        <span style={{ borderRight: "1px solid #fff" }}></span>
                        <Link
                          data-tip={liveAppExists ? null : "tool"}
                          target={liveAppExists ? "_blank" : "_self"}
                          to={
                            liveAppExists
                              ? _.get(project, "liveApplicationLink")
                              : "#"
                          }
                          className={`button ${
                            liveAppExists ? "" : "disabled"
                          }`}
                        >
                          Live Application
                        </Link>
                        <ReactTooltip place="bottom" type="dark" effect="solid">
                          <span style={{ fontSize: "11px" }}>
                            Not Available
                          </span>
                        </ReactTooltip>
                      </React.Fragment>
                    </footer>
                  </div>
                </article>
              )
            );
          })}
        </div>
      </Layout>
    );
  }
}
