import React from "react";
import _ from "lodash";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "../components/index";
import { htmlToReact, safePrefix } from "../utils";

export default class Contact extends React.Component {
  state = {
    name: "",
    reason: "full",
    email: "",
    message: "",
    status: null
  };

  success = () =>
    toast.success("Thanks for your message. I'll respond shortly", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });
  failure = () =>
    toast.error("Something went wrong. Can you try again later?", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false
    });

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#contact-form"));

    fetch("/contact", {
      method: "POST",
      body: formData
    })
      .then(() => {
        this.success();
        this.setState({ name: "", reason: "full", email: "", message: "" });
      })
      .catch(error => this.failure());
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (name === "name") {
      return this.setState({ name: value });
    } else if (name === "email") {
      return this.setState({ email: value });
    } else if (name === "reason") {
      return this.setState({ reason: value });
    } else if (name === "message") {
      return this.setState({ message: value });
    }
  };

  contactForm() {
    return (
      <form
        action="/contact"
        name="contactForm"
        method="POST"
        netlify-honeypot="bot-field"
        data-netlify="true"
        id="contact-form"
        className="contact-form"
        onSubmit={this.handleSubmit}
      >
        <input
          ref="form-name"
          type="hidden"
          name="form-name"
          value="contactForm"
        />

        <p className="screen-reader-text">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        <p className="form-row">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </p>
        <p className="form-row">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />
        </p>
        <p className="form-row">
          <label className="form-label">Reason for message</label>
          <select
            value={this.state.reason}
            name="reason"
            onChange={this.handleChange}
          >
            <option value="full">Full-time Position</option>
            <option value="contract">Contract Position</option>
            <option value="project">Project</option>
            <option value="other">Other</option>
          </select>
        </p>
        <p className="form-row">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-textarea"
            rows="7"
            required
            value={this.state.message}
            onChange={this.handleChange}
          />
        </p>
        <input type="hidden" name="form-name" value="contactForm" />
        <p className="form-row">
          <button type="submit" className="button">
            Send Message
          </button>
        </p>
      </form>
    );
  }

  render() {
    return (
      <Layout {...this.props}>
        <ToastContainer
          transition={Slide}
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
        />

        <article className="post page post-full">
          <header className="post-header">
            <h1 className="post-title underline">
              {_.get(this.props, "pageContext.frontmatter.title")}
            </h1>
          </header>
          {_.get(this.props, "pageContext.frontmatter.subtitle") && (
            <div className="post-subtitle">
              {htmlToReact(
                _.get(this.props, "pageContext.frontmatter.subtitle")
              )}
            </div>
          )}
          {_.get(this.props, "pageContext.frontmatter.img_path") && (
            <div className="post-thumbnail">
              <img
                src={safePrefix(
                  _.get(this.props, "pageContext.frontmatter.img_path")
                )}
                alt={_.get(this.props, "pageContext.frontmatter.title")}
              />
            </div>
          )}
          <div className="post-content">
            {htmlToReact(_.get(this.props, "pageContext.html"))}
            {this.contactForm()}
          </div>
        </article>
      </Layout>
    );
  }
}
