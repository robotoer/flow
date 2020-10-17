variable "gcp_credentials" {
  type    = string
  default = ".credentials.json"
}

variable "gcp_project" {
  type    = string
  default = ""
}

variable "gcp_region" {
  type    = string
  default = "us-central1"
}

variable "gcp_zones" {
  type    = list(string)
  default = ["us-central1-a", "us-central1-b", "us-central1-f"]
}

variable "gke_service_account" {
  type    = string
  default = "project-service-account@<PROJECT ID>.iam.gserviceaccount.com"
}
