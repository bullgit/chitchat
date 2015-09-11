#!/usr/bin/env ruby
require "rack"
require 'chaplin'
require 'omniauth-github'

class OmniAuthForwarder

  def initialize(app)
    @app = app
  end

  def call(env)
    if env['omniauth.auth']
      env["QUERY_STRING"] = Rack::Utils.build_query({auth: env['omniauth.auth'].to_h})
      env["rack.request.query_string"] = Rack::Utils.build_query({auth: env['omniauth.auth'].to_h})
      env["rack.request.query_hash"] = {auth: env['omniauth.auth'].to_h}
      request = Rack::Request.new(env)
    end

    @app.call(env)
  end

end

use Rack::Session::Cookie
use OmniAuth::Builder do
  provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET']
end

use OmniAuthForwarder

run Chaplin.new(Dir.pwd + "/dist").server
