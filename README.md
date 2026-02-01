# Multi-Region Web App on AWS (App Runner)

Deploy a Node.js web application to multiple AWS regions with automatic GitHub deployments, region awareness, and real-world latency measurement — building the foundation for high availability and failover-ready architectures.

## Project Overview

Most applications run in a single AWS region. When that region fails, users experience downtime while engineers scramble to recover.

This project demonstrates a better approach:

The same application runs in multiple AWS regions

GitHub pushes automatically deploy to all regions

Each deployment is region-aware

Users can measure real-world latency between regions

The system is ready for automatic failover (next phase)

This is the same multi-region foundation used by companies like Netflix, Amazon, and Stripe.

🧠 What This Project Solves (Real World)
❌ Problems with single-region apps

Regional outages cause full downtime

Manual redeployments during incidents

Poor latency for global users

High operational stress during failures

## What this architecture enables

Redundancy: One region can fail without taking the app down

Fast recovery: No redeploying under pressure

Lower latency: Users connect to closer regions

Production readiness: Built-in CI/CD and observability

## 🏗️ Architecture
GitHub (main branch)
        |
        |  (automatic deployment)
        v
AWS App Runner (us-east-1)  ----->  Public HTTPS URL
AWS App Runner (us-west-2)  ----->  Public HTTPS URL


Both regions watch the same GitHub repository

Each region has its own GitHub connection

Deployments happen independently but automatically

App Runner manages:

Builds

Containers

Scaling

HTTPS certificates

## 🧰 Tools & Technologies Used
Tool	Purpose
Node.js (Express.js)	Web application
AWS App Runner	Managed container hosting
GitHub	Source control & CI/CD trigger
AWS Regions	Multi-region redundancy
Environment Variables	Region detection
Browser Performance API	Latency measurement
## ✨ Key Features
🌎 Multi-Region Deployment

App runs in us-east-1 (Virginia) and us-west-2 (Oregon)

Each region deploys independently

AWS resources are region-specific by design

## 🔁 Automatic Deployments (CI/CD)

Any push to the main branch:

Triggers deployment in both regions

No manual steps required

Demonstrates real-world continuous deployment

## 📍 Region Awareness

The app detects its running region using:

process.env.AWS_REGION || "local"


Each region responds with:

Hello from us-east-1!
Hello from us-west-2!


This is critical for:

Debugging

Failover testing

Observability

## ⏱ Real-World Latency Measurement

A minimal index.html page:

Pings multiple regional endpoints

Measures round-trip latency using performance.now()

Displays results as plain text

Uses CORS-enabled requests

Example output:

us-east-1: 214 ms
us-west-2: 195 ms


This mimics how CDNs choose the fastest region for users.

📂 Project Structure
.
├── index.js        # Express server (region-aware + CORS)
├── index.html      # Browser-based latency tester
├── package.json    # App dependencies and start script
└── README.md

## 🔐 Why Each Region Needs Its Own GitHub Connection

AWS resources are region-scoped.

That means:

us-east-1 cannot see connections in us-west-2

Each App Runner service must have:

Its own GitHub connection

Its own deployment configuration

This mirrors real production AWS behavior.

## 🧪 How to Test It

Open the App Runner URL for each region

Confirm region-specific responses

Open the root URL to view latency measurements

Use browser DevTools → Network tab to inspect RTT

Compare latency from different geographic locations

## 💡 Why This Matters

AWS outages do happen (us-east-1 has gone down before)

Latency directly impacts:

User experience

Conversion rates

Reliability perception

Multi-region architecture is not optional for critical systems

This project builds the exact foundation required for:

Route 53 failover

CloudFront origin groups

Global traffic routing

Disaster recovery strategies