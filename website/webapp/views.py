from flask import Blueprint, request, render_template, jsonify
from website.projects.KNASpunten.competition.competition_factory import competition_factory  # Ensure this import is correct
from website.projects.KNASpunten.formulas import points_formula

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template('home.html')

@views.route('/KNASpunten', methods=['POST', 'GET'])
def knaspunten():

    if request.method == 'POST':
        url = request.form.get("url")
        comp_type = request.form.get('comp_type')
        final_ranking = request.form.get('final_ranking')

        competition = competition_factory(url)
        percentage = competition.calculate_percentage()
        points = points_formula(percentage, comp_type, final_ranking)

        # Check if the request is an AJAX request
        return jsonify({
            'percentage': percentage,
            'points': points
        })

    return render_template('knaspunten.html')